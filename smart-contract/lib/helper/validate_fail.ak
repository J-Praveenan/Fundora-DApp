use aiken/collection/list
use cardano/transaction.{InlineDatum, Output, Transaction}
use types/campaign_datum.{Active, CampaignDatum, Failed}
use types/crowdfunding_datum.{Campaign, CrowdfundingDatum}

fn is_campaign_output(output: Output) -> Bool {
  when output.datum is {
    InlineDatum(raw) -> {
      expect typed_datum: CrowdfundingDatum = raw

      when typed_datum is {
        Campaign(_) -> True
        _ -> False
      }
    }

    _ -> False
  }
}

pub fn validate_fail(
  old: CampaignDatum,
  self: Transaction,
) -> Bool {
  let campaign_outputs =
    list.filter(self.outputs, is_campaign_output)

  expect Some(output) = list.head(campaign_outputs)
  expect InlineDatum(raw) = output.datum
  expect typed_datum: CrowdfundingDatum = raw
  expect Campaign(new_datum) = typed_datum

  let old_active =
    old.status == Active

  let not_reached =
    old.raised_amount < old.target_amount

  let new_failed =
    new_datum.status == Failed

  let same_campaign =
    new_datum.campaign_id == old.campaign_id

  let same_creator =
    new_datum.creator == old.creator

  let same_target =
    new_datum.target_amount == old.target_amount

  let same_raised =
    new_datum.raised_amount == old.raised_amount

  let same_deadline =
    new_datum.deadline == old.deadline

  and {
    old_active,
    not_reached,
    new_failed,
    same_campaign,
    same_creator,
    same_target,
    same_raised,
    same_deadline,
  }
}