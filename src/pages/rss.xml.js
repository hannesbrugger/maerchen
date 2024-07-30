import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { ConvertDateTime } from '../components/ConvertDateTime';

export async function GET(context) {
	const blog = await getCollection('blog');
	return rss({
		stylesheet: '/rss/styles.xsl',
		title: 'Ullis Märchen',
		description: 'Ein Blog über meine Events',
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.Titel,
			pubDate: "2019-12-29 18:00:00 +0100",
			description: post.data.Beschreibung,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
		})),
	});
}