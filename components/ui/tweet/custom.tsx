import type { Tweet } from "react-tweet/api";
import { type TwitterComponents, TweetHeader, TweetInReplyTo, TweetBody, TweetMedia, TweetInfo, TweetActions, QuotedTweet, enrichTweet, TweetContainer } from "react-tweet"
import { archivo } from "@/lib/general/fonts";
 
type Props = {
	tweet: Tweet;
	components?: TwitterComponents;
}
 
export const TweetCustom = ({ tweet: t, components }: Props) => {
	const tweet = enrichTweet(t);

	return (
		<TweetContainer
			className={`h-fit! max-w-full! min-w-1/4! bg-foreground/5! rounded-xl! border border-foreground/50! hover:border-super-purple! dark:bg-foreground/10! dark:hover:border-super-yellow! [&>*]:${archivo.className} lg:hover:scale-105!`}
		>
			<TweetHeader tweet={tweet} components={components} />
			{tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
			<div
				className={`[&>p]:text-base!`}
			>
				<TweetBody tweet={tweet} />
			</div>
			{tweet.mediaDetails?.length ? (
				<TweetMedia tweet={tweet} components={components} />
			) : null}
			{tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
			<TweetInfo tweet={tweet} />
			<TweetActions tweet={tweet} />
			{/* We're not including the `TweetReplies` component that adds the reply button */}
		</TweetContainer>
	);
}