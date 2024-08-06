import {
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
    ISpeculate as ISpeculateEvent,
    Transfer as TransferEvent
  } from "../generated/CookieContract/CookieContract"
  import {
    Approval,
    ApprovalForAll,
    ISpeculate,
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
  
  export function handleISpeculate(event: ISpeculateEvent): void {
    let entity = new ISpeculate(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.speculator = event.params.speculator
    entity.speculation = event.params.speculation
  
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
  