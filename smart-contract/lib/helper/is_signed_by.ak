use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{Transaction}

pub fn is_signed_by(self: Transaction, signer: VerificationKeyHash) -> Bool {
  list.any(self.extra_signatories, fn(s) { s == signer })
}