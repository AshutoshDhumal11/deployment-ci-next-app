import { getUserInfo } from "../actions/getUserInfo";

export default async function Home() {
  const user = await getUserInfo();
  
  return (
    <div>
      {user?.username}
      {user?.password}
    </div>
  );
}
 