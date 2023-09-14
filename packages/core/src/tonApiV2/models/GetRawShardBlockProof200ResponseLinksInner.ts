/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BlockRaw } from './BlockRaw';
import {
    BlockRawFromJSON,
    BlockRawFromJSONTyped,
    BlockRawToJSON,
} from './BlockRaw';

/**
 * 
 * @export
 * @interface GetRawShardBlockProof200ResponseLinksInner
 */
export interface GetRawShardBlockProof200ResponseLinksInner {
    /**
     * 
     * @type {BlockRaw}
     * @memberof GetRawShardBlockProof200ResponseLinksInner
     */
    id: BlockRaw;
    /**
     * 
     * @type {string}
     * @memberof GetRawShardBlockProof200ResponseLinksInner
     */
    proof: string;
}

/**
 * Check if a given object implements the GetRawShardBlockProof200ResponseLinksInner interface.
 */
export function instanceOfGetRawShardBlockProof200ResponseLinksInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "proof" in value;

    return isInstance;
}

export function GetRawShardBlockProof200ResponseLinksInnerFromJSON(json: any): GetRawShardBlockProof200ResponseLinksInner {
    return GetRawShardBlockProof200ResponseLinksInnerFromJSONTyped(json, false);
}

export function GetRawShardBlockProof200ResponseLinksInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawShardBlockProof200ResponseLinksInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': BlockRawFromJSON(json['id']),
        'proof': json['proof'],
    };
}

export function GetRawShardBlockProof200ResponseLinksInnerToJSON(value?: GetRawShardBlockProof200ResponseLinksInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': BlockRawToJSON(value.id),
        'proof': value.proof,
    };
}
