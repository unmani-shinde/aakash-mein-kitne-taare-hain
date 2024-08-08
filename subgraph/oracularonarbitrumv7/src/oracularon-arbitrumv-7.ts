import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  CookieMinted as CookieMintedEvent,
  CookieSentToGossip as CookieSentToGossipEvent,
  ISpeculated as ISpeculatedEvent,
  MetadataUpdate as MetadataUpdateEvent,
  Transfer as TransferEvent
} from "../generated/OracularonArbitrumv7/OracularonArbitrumv7"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  CookieMinted,
  CookieSentToGossip,
  ISpeculated,
  MetadataUpdate,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCookieMinted(event: CookieMintedEvent): void {
  let entity = new CookieMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenOwner = event.params.tokenOwner
  entity.tokenId = event.params.tokenId
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCookieSentToGossip(event: CookieSentToGossipEvent): void {
  let entity = new CookieSentToGossip(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenOwner = event.params.tokenOwner
  entity.tokenId = event.params.tokenId
  entity.gossipNetworkId = event.params.gossipNetworkId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleISpeculated(event: ISpeculatedEvent): void {
  let entity = new ISpeculated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.speculator = event.params.speculator
  entity.speculationAmt = event.params.speculationAmt
  entity.cookieId = event.params.cookieId
  entity.speculation = event.params.speculation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
