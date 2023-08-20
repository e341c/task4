import Head from "next/head";
import Users from "./components/Users";

export default function Home() {
    return (
        <>
            <Head>
                <title>Task4</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Users />
            </main>
        </>
    );
}