use cardano/transaction.{OutputReference, Transaction}
use helper/validate_contribute.{validate_contribute}
use helper/validate_fail.{validate_fail}
use helper/validate_withdraw.{validate_withdraw}
use types/campaign_datum.{CampaignDatum}
use types/campaign_redeemer.{
  CampaignRedeemer,
  Contribute,
  MarkFailed,
  Withdraw,
}

validator crowdfunding {
  spend(
    datum: Option<CampaignDatum>,
    redeemer: CampaignRedeemer,
    _utxo: OutputReference,
    self: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Contribute(amount) ->
        validate_contribute(d, amount, self)

      Withdraw ->
        validate_withdraw(d, self)

      MarkFailed ->
        validate_fail(d, self)
    }
  }

  else(_) {
    fail
  }
}