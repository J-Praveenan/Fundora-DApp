use aiken/collection/list
use cardano/transaction.{Transaction, InlineDatum}
use types/campaign_datum.{Active, CampaignDatum, Successful}

pub fn validate_contribute(
  d: CampaignDatum,
  amount: Int,
  self: Transaction,
) -> Bool {
  expect Some(output) = list.head(self.outputs)
  expect InlineDatum(raw) = output.datum
  expect new_datum: CampaignDatum = raw

  let valid_old_status =
    d.status == Active

  let valid_amount =
    amount > 0

  let raised_correct =
    new_datum.raised_amount == d.raised_amount + amount

  let status_correct =
    if new_datum.raised_amount >= d.target_amount {
      new_datum.status == Successful
    } else {
      new_datum.status == Active
    }

  valid_old_status && valid_amount && raised_correct && status_correct
}