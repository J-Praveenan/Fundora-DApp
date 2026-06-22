use types/campaign_datum.{CampaignDatum}
use types/contribution_datum.{ContributionDatum}

pub type CrowdfundingDatum {
  Campaign(CampaignDatum)
  Contribution(ContributionDatum)
}