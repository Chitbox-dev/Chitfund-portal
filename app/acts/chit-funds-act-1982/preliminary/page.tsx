import Link from "next/link"
import { ArrowLeft, BookOpen, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PreliminaryChapterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/legal/acts-and-rules"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Acts and Rules</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Chapter Header */}
          <div className="bg-gradient-to-r from-chitfund-blue-950 to-blue-800 text-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Chapter I - Preliminary</h1>
                <p className="text-blue-100">The Chit Funds Act, 1982</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Printer className="h-4 w-4 mr-2" />
                Print Chapter
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Chapter Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <h2>1. Short title, extent and commencement</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p>This Act may be called the Chit Funds Act, 1982.</p>
                </li>
                <li>
                  <p>It extends to the whole of India except the State of Jammu and Kashmir.</p>
                </li>
                <li>
                  <p>
                    It shall come into force on such date as the Central Government may, by notification in the Official
                    Gazette, appoint, and different dates may be appointed for different States.
                  </p>
                </li>
              </ol>

              <h2 className="mt-8">2. Definitions</h2>
              <p>In this Act, unless the context otherwise requires:</p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p>
                    <strong>"Approved bank"</strong> means the State Bank of India constituted under the State Bank of
                    India Act, 1955 (23 of 1955) or a subsidiary bank constituted under the State Bank of India
                    (Subsidiary Banks) Act, 1959 (38 of 1959) or a corresponding new bank constituted under the Banking
                    Companies (Acquisition and Transfer of Undertakings) Act, 1970 (5 of 1970) or a Regional Rural Bank
                    established under the Regional Rural Banks Act, 1976 (21 of 1976) or a corresponding new bank
                    constituted under the Banking Companies (Acquisition and Transfer of Undertakings) Act, 1980 (40 of
                    1980) or a co-operative bank as defined in clause (b) of section 2 of the Reserve Bank of India Act,
                    1934 (2 of 1934) or such other banking institution as may be notified by the Central Government for
                    this purpose.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>"Chit"</strong> means a transaction whether called chit, chit fund, chitty, kuri or by any
                    other name by or under which a person enters into an agreement with a specified number of persons
                    that every one of them shall subscribe a certain sum of money (or a certain quantity of grain
                    instead) by way of periodical installments over a definite period and that each such subscriber
                    shall, in his turn, as determined by lot or by auction or by tender or in such other manner as may
                    be specified in the chit agreement, be entitled to the prize amount.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>"Chit agreement"</strong> means the document containing the articles of agreement between
                    the foreman and the subscribers relating to the chit.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>"Foreman"</strong> means the person who under the chit agreement is responsible for the
                    conduct of the chit and includes any person discharging the functions of the foreman under section
                    39.
                  </p>
                </li>
              </ol>

              <h2 className="mt-8">3. Application of the Act</h2>
              <p>The provisions of this Act shall not apply to:</p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p>Any chit started before the commencement of this Act.</p>
                </li>
                <li>
                  <p>
                    Any chit the amount of which, or where two or more chits were started or conducted simultaneously by
                    the same foreman, the aggregate amount of which does not exceed one hundred rupees.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
