import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  return (
    <>
      <Tabs defaultValue="foryou" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="foryou">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="following">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
