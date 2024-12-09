import ForYou from "@/components/for-you";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  return (
    <>
      <Tabs defaultValue="foryou" className="w-full max-w-xl">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="foryou">
            For You
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="following">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="foryou">
          <ForYou />
        </TabsContent>
        <TabsContent value="following">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
