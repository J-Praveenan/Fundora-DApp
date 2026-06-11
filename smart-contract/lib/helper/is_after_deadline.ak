use aiken/interval
use cardano/transaction.{Transaction}

pub fn is_after_deadline(
  self: Transaction,
  deadline: Int,
) -> Bool {

  interval.is_entirely_after(self.validity_range, deadline)
}
