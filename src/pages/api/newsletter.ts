
import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const prerender = false

export const POST: APIRoute = async ({ request }) => {

    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const name = url.searchParams.get('name');

    if (!email) {
        return new Response(
            JSON.stringify({ message: 'E-Mail-Adresse ist erforderlich.' }),
            { status: 400 }
        );
    }

    if (!name) {
        return new Response(
            JSON.stringify({ message: 'Name ist erforderlich.' }),
            { status: 400 }
        );
    }

    // E-Mail-Adresse einfügen
    const { data, error } = await supabase
        .from('emails')
        .insert([{ mail: email, name: name }]);


    return new Response(null, {
        status: 302,
    });

};
