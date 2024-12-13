import Following from "@/components/following";
import ForYou from "@/components/for-you";
import TrendsSidebar from "@/components/trends-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <>
      <div className="w-full max-w-xl overflow-y-auto py-4">
        <Tabs defaultValue="foryou" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="foryou">
              For You
            </TabsTrigger>
            <TabsTrigger
              className="flex-1"
              value="following"
              disabled={!session}
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="foryou">
            <ForYou />
          </TabsContent>
          <TabsContent value="following">
            <Following />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </>
  );
}
