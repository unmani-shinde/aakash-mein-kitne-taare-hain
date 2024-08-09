import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  CookieMinted,
  CookieSentToGossip,
  ISpeculated,
  MetadataUpdate,
  Transfer
} from "../generated/OracularonPolygonAmoyv1/OracularonPolygonAmoyv1"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBatchMetadataUpdateEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt
): BatchMetadataUpdate {
  let batchMetadataUpdateEvent = changetype<BatchMetadataUpdate>(newMockEvent())

  batchMetadataUpdateEvent.parameters = new Array()

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )

  return batchMetadataUpdateEvent
}

export function createCookieMintedEvent(
  tokenOwner: Address,
  tokenId: BigInt,
  uri: string
): CookieMinted {
  let cookieMintedEvent = changetype<CookieMinted>(newMockEvent())

  cookieMintedEvent.parameters = new Array()

  cookieMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenOwner",
      ethereum.Value.fromAddress(tokenOwner)
    )
  )
  cookieMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  cookieMintedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return cookieMintedEvent
}

export function createCookieSentToGossipEvent(
  tokenOwner: Address,
  tokenId: BigInt,
  gossipNetworkId: Address
): CookieSentToGossip {
  let cookieSentToGossipEvent = changetype<CookieSentToGossip>(newMockEvent())

  cookieSentToGossipEvent.parameters = new Array()

  cookieSentToGossipEvent.parameters.push(
    new ethereum.EventParam(
      "tokenOwner",
      ethereum.Value.fromAddress(tokenOwner)
    )
  )
  cookieSentToGossipEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  cookieSentToGossipEvent.parameters.push(
    new ethereum.EventParam(
      "gossipNetworkId",
      ethereum.Value.fromAddress(gossipNetworkId)
    )
  )

  return cookieSentToGossipEvent
}

export function createISpeculatedEvent(
  speculator: Address,
  speculationAmt: BigInt,
  cookieId: BigInt,
  speculation: boolean
): ISpeculated {
  let iSpeculatedEvent = changetype<ISpeculated>(newMockEvent())

  iSpeculatedEvent.parameters = new Array()

  iSpeculatedEvent.parameters.push(
    new ethereum.EventParam(
      "speculator",
      ethereum.Value.fromAddress(speculator)
    )
  )
  iSpeculatedEvent.parameters.push(
    new ethereum.EventParam(
      "speculationAmt",
      ethereum.Value.fromUnsignedBigInt(speculationAmt)
    )
  )
  iSpeculatedEvent.parameters.push(
    new ethereum.EventParam(
      "cookieId",
      ethereum.Value.fromUnsignedBigInt(cookieId)
    )
  )
  iSpeculatedEvent.parameters.push(
    new ethereum.EventParam(
      "speculation",
      ethereum.Value.fromBoolean(speculation)
    )
  )

  return iSpeculatedEvent
}

export function createMetadataUpdateEvent(_tokenId: BigInt): MetadataUpdate {
  let metadataUpdateEvent = changetype<MetadataUpdate>(newMockEvent())

  metadataUpdateEvent.parameters = new Array()

  metadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return metadataUpdateEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
