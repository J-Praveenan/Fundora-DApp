use cardano/transaction.{Transaction}
use helper/is_signed_by.{is_signed_by}
use types/campaign_datum.{CampaignDatum, Successful}
use helper/is_after_deadline.{is_after_deadline}

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

let after_deadline =
  is_after_deadline(self, d.deadline)

  signed && target_reached && valid_status && after_deadline
}