"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileText } from "lucide-react"

interface CertificateTemplateSelectorProps {
  id?: string
  value: string
  onChange: (value: string) => void
}

export function CertificateTemplateSelector({
  id,
  value,
  onChange,
}: CertificateTemplateSelectorProps) {

  const templates = [
    {
      id: "template1",
      name: "Standard Template",
      description: "Official template with Karnataka Government header",
      preview: "/certificate-previews/template1.svg",
    },
    {
      id: "template2",
      name: "Modern Template",
      description: "Clean, modern design with improved readability",
      preview: "/certificate-previews/template2.svg",
    },
    {
      id: "template3",
      name: "Watermark Template",
      description: "Elegant design with official watermark for enhanced security",
      preview: "/certificate-previews/template3.svg",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Certificate Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label className="text-base">Select Template</Label>
            <RadioGroup
              value={value}
              onValueChange={onChange}
              id={id}
              className="mt-3 space-y-4"
            >
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`flex items-start space-x-3 border rounded-lg p-4 ${value === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                >
                  <RadioGroupItem value={template.id} id={`${id}-${template.id}`} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={`${id}-${template.id}`} className="text-base font-medium cursor-pointer">
                      {template.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="p-4 border rounded-lg mt-4">
            <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden border">
              <img
                src={templates.find((t) => t.id === value)?.preview}
                alt="Template Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}