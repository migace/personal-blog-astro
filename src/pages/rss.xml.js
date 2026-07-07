export const prerender = true;
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE } from '../consts';
import { filterByLang, getPostUrl, sortByDateDesc } from '../utils/posts';
import { blogPage } from '../i18n/content/pages';

export async function GET(context) {
	const posts = sortByDateDesc(filterByLang(await getCollection('blog'), 'en'));
	return rss({
		title: `${SITE_TITLE} - Blog`,
		description: blogPage.en.metaDescription,
		site: context.site,
		customData: `<language>en-US</language>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags ?? [],
			link: getPostUrl(post),
		})),
	});
}
