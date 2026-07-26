import type { Metadata } from "next";
import LearnPageContent from "@/components/LearnPageContent";

export const metadata: Metadata = {
  title: "Learn About the Chamber Orchestra",
  description: "Discover the history and structure of a chamber orchestra, and how its instrument sections fit together.",
};

export default function LearnPage() {
  return <LearnPageContent />;
}
