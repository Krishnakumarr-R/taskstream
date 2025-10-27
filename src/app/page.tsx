import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";

const page = async() => {
  await requireAuth()
  const { data } = authClient.useSession();

  return (
    <div>
      {JSON.stringify(data)}
      { data &&
      <Button onClick={()=>authClient.signOut()}>logout</Button>
    }
    </div>
  );
};

export default page;
