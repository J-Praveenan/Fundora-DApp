use cardano/transaction.{OutputReference, Transaction}
use helper/validate_contribute.{validate_contribute}
use helper/validate_fail.{validate_fail}
use helper/validate_withdraw.{validate_withdraw}
use types/campaign_redeemer.{
  CampaignRedeemer, Contribute, MarkFailed, Withdraw,
}
use types/crowdfunding_datum.{Campaign, CrowdfundingDatum}

validator crowdfunding {
  spend(
    datum: Option<CrowdfundingDatum>,
    redeemer: CampaignRedeemer,
    _utxo: OutputReference,
    self: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Contribute(amount) -> {
        expect Campaign(campaign_datum) = d
        validate_contribute(campaign_datum, amount, self)
      }

      Withdraw -> {
        expect Campaign(campaign_datum) = d
        validate_withdraw(campaign_datum, self)
      }

      MarkFailed -> {
        expect Campaign(campaign_datum) = d
        validate_fail(campaign_datum, self)
      }

    }
  }

  else(_) {
    fail
  }
}
