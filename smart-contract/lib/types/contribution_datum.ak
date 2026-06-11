use aiken/crypto.{VerificationKeyHash}

pub type ContributionDatum {
  campaign_id: ByteArray,
  contributor: VerificationKeyHash,
  amount: Int,
}