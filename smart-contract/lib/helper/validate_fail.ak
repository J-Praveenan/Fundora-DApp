use aiken/collection/list
use cardano/transaction.{Transaction, InlineDatum}
use types/campaign_datum.{Active, CampaignDatum, Failed}
use helper/is_after_deadline.{is_after_deadline}

pub fn validate_fail(
  d: CampaignDatum,
  self: Transaction,
) -> Bool {
  expect Some(output) = list.head(self.outputs)
  expect InlineDatum(raw) = output.datum
  expect new_datum: CampaignDatum = raw

  let not_reached =
    d.raised_amount < d.target_amount

  let old_active =
    d.status == Active

  let new_failed =
    new_datum.status == Failed

  let after_deadline =
    is_after_deadline(self, d.deadline)

  old_active && not_reached && new_failed && after_deadline
}