use aiken/crypto.{VerificationKeyHash}

pub type CampaignStatus {
  Active
  Successful
  Failed
  Withdrawn
}

pub type CampaignDatum {
  creator: VerificationKeyHash,
  title: ByteArray,
  description: ByteArray,
  image_url: ByteArray,
  target_amount: Int,
  raised_amount: Int,
  deadline: Int,
  status: CampaignStatus,
}