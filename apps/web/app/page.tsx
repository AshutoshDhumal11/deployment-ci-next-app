import { getUserInfo } from "../actions/getUserInfo";

export default async function Home() {
  const user = await getUserInfo();
  
  return (
    <div>
      user:
      {user?.username}
      password:
      {user?.password}
    </div>
  );
}
 
