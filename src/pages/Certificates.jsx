import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { certificatesData, addHistory } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import jsPDF from 'jspdf'

function downloadCertificate(c) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  doc.setFontSize(22)
  doc.text('Certificate of Completion', 210, 120, { align: 'center' })
  doc.setFontSize(14)
  doc.text(`This certifies that`, 210, 160, { align: 'center' })
  doc.setFontSize(18)
  doc.text(`You`, 210, 190, { align: 'center' })
  doc.setFontSize(14)
  doc.text(`has successfully completed`, 210, 220, { align: 'center' })
  doc.setFontSize(18)
  doc.text(`${c.courseName}`, 210, 250, { align: 'center' })
  doc.setFontSize(12)
  doc.text(`Completion Date: ${formatDate(c.completionDate)}`, 210, 280, { align: 'center' })
  doc.save(`${c.courseName.replace(/\s+/g,'_')}.pdf`)
  addHistory({ type: 'certificate', detail: `Downloaded certificate for ${c.courseName}` })
}

export default function Certificates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Certificates</h1>
        <p className="text-slate-600">Your achievements</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {certificatesData.map(c => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="text-lg">{c.courseName}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="text-sm text-slate-600">Completed on <span className="font-medium">{formatDate(c.completionDate)}</span></div>
              <Button onClick={()=>downloadCertificate(c)}>Download PDF</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
