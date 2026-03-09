import { ViewsLandingCommunity } from "@/components/views/landing/community";
import { ViewsLandingCta } from "@/components/views/landing/cta";
import { ViewsLandingEvents } from "@/components/views/landing/events";
import { ViewsLandingFaq } from "@/components/views/landing/faq";
import { ViewsLandingHero } from "@/components/views/landing/hero";
import { ViewsLandingMembers } from "@/components/views/landing/members";
import { ViewsLandingMission } from "@/components/views/landing/mission";
import { ViewsLandingPartners } from "@/components/views/landing/partners";
import { ViewsLandingStats } from "@/components/views/landing/stats";

export default function Page() {
	return (
		<div
			className={`grid gap-24 lg:gap-48`}
		>
			<ViewsLandingHero />
			<ViewsLandingMission />
			<ViewsLandingStats />
			<ViewsLandingEvents />
			<ViewsLandingMembers />
			<ViewsLandingPartners />
			<ViewsLandingCommunity />
			<ViewsLandingFaq />
			<ViewsLandingCta />
		</div>
	);
}
