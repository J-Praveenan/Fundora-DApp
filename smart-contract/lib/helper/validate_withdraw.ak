use cardano/transaction.{Transaction}
use helper/is_signed_by.{is_signed_by}
use types/campaign_datum.{CampaignDatum, Successful}

pub fn validate_withdraw(
  d: CampaignDatum,
  self: Transaction,
) -> Bool {
  let signed =
    is_signed_by(self, d.creator)

  let target_reached =
    d.raised_amount >= d.target_amount

  let valid_status =
    d.status == Successful

  and{
    signed,
    target_reached,
    valid_status,
  }

  
}