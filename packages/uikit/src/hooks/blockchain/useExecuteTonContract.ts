import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IStorage } from '@tonkeeper/core/dist/Storage';
import { WalletState } from '@tonkeeper/core/dist/entries/wallet';
import { Configuration, Fee } from '@tonkeeper/core/dist/tonApiV1';
import { Omit } from 'react-beautiful-dnd';
import { notifyError } from '../../components/transfer/common';
import { getWalletPassword } from '../../state/password';
import { AmplitudeTransactionType, useTransactionAnalytics } from '../amplitude';
import { useAppContext, useWalletContext } from '../appContext';
import { useAppSdk } from '../appSdk';
import { useTranslation } from '../translation';

export type ContractExecutorParams = {
    storage: IStorage;
    tonApi: Configuration;
    walletState: WalletState;
    password: string;
    fee: Fee;
};

export function useExecuteTonContract<Args extends ContractExecutorParams>(
    {
        executor,
        eventName2
    }: {
        executor: (params: Args) => Promise<void>;
        eventName2: AmplitudeTransactionType;
    },
    args: Omit<Args, Exclude<keyof ContractExecutorParams, 'fee'>>
) {
    const { t } = useTranslation();
    const sdk = useAppSdk();
    const {
        api: { tonApi }
    } = useAppContext();
    const walletState = useWalletContext();
    const client = useQueryClient();
    const track2 = useTransactionAnalytics();

    return useMutation<boolean, Error>(async () => {
        if (!args.fee) {
            return false;
        }

        const password = await getWalletPassword(sdk, 'confirm').catch(() => null);
        if (password === null) return false;

        track2(eventName2);
        try {
            await executor({
                storage: sdk.storage,
                tonApi,
                walletState,
                password,
                ...args
            } as Args);
        } catch (e) {
            await notifyError(client, sdk, t, e);
        }

        await client.invalidateQueries([walletState.active.rawAddress]);
        await client.invalidateQueries();
        return true;
    });
}
