use aiken/interval
use cardano/transaction.{Transaction}

pub fn is_after_deadline(
  self: Transaction,
  deadline: Int,
) -> Bool {

  interval.contains(
    self.validity_range,
    deadline,
  )
}