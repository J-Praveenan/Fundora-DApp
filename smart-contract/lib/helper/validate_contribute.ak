use aiken/collection/list
use cardano/transaction.{InlineDatum, Output, Transaction}
use types/campaign_datum.{Active, CampaignDatum, Successful}
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

pub fn validate_contribute(
  d: CampaignDatum,
  amount: Int,
  self: Transaction,
) -> Bool {
  let campaign_outputs =
    list.filter(self.outputs, is_campaign_output)

  expect Some(output) = list.head(campaign_outputs)
  expect InlineDatum(raw) = output.datum
  expect typed_datum: CrowdfundingDatum = raw
  expect Campaign(new_datum) = typed_datum

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

  and {
    valid_old_status,
    valid_amount,
    raised_correct,
    status_correct,
  }
  
}