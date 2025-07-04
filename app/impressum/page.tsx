import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Info } from "lucide-react";


export default function Impressum() {

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Impressum</h1>
          <p className="text-muted-foreground text-lg">
            Legal Notice and Information
          </p>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Legal Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Project Information:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This website is a purely private, non-commercial Portfolio and
                serves exclusively for experimental and personal learning
                purposes. There is neither commercial use nor profit intention.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Legal Basis:
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                According to § 5 TMG, there is therefore no obligation to
                provide an impressum.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AnotherProject</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ColdByDefault
              {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>

        <div className="text-center pt-6">
          <p className="text-xs">
            Last updated:{" "}
            {new Date().toLocaleDateString("de-DE")}
          </p>
        </div>
      </div>
    </div>
  );
}
