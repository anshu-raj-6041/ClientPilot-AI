// import HomeClient from "@/components/HomeClient";
import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";


export default async function Home() {
  const session = await getSession();
  // console.log(session)
  return (
    <>
      <HomeClient email={session?.user?.email ?? ""} />
      {/* {session?.user?.email && (
        <HomeClient email={session.user?.email!} />
      )} */}

    </>

  );
}
