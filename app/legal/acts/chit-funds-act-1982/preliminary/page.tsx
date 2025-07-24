import ActDocumentationLayout from "@/components/legal/act-documentation-layout"

export default function ChitFundsActPreliminaryPage() {
  return (
    <ActDocumentationLayout
      currentAct="chit-funds-act-1982"
      currentChapter="preliminary"
      title="The Chit Funds Act, 1982"
      subtitle="An Act to provide for the regulation of chit funds"
      year="(Act No. 40 of 1982)"
    >
      <div className="text-center mb-6">
        <p className="text-lg">An Act to provide for the regulation of chit funds</p>
        <p>and for matters connected therewith</p>
      </div>

      <div className="mb-6">
        <p>BE it enacted by Parliament in the Thirty-third Year of the Republic of India as follows:-</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Chapter I</h2>
      <h3 className="text-lg font-bold uppercase mb-6">PRELIMINARY</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold">1. Short title, extent and commencement</h4>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>This Act may be called the Chit Funds Act, 1982.</li>
            <li>It extends to the whole of India except the State of Jammu and Kashmir.</li>
            <li>
              It shall come into force on such date as the Central Government may, by notification in the Official
              Gazette, appoint, and different dates may be appointed for different States.
            </li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold">2. Definitions</h4>
          <p className="mt-2">In this Act, unless the context otherwise requires:</p>
          <ol className="list-decimal pl-6 space-y-4 mt-2">
            <li>
              <p>
                <strong>"Approved bank"</strong> means the State Bank of India constituted under the State Bank of India
                Act, 1955 (23 of 1955) or a subsidiary bank constituted under the State Bank of India (Subsidiary Banks)
                Act, 1959 (38 of 1959) or a corresponding new bank constituted under the Banking Companies (Acquisition
                and Transfer of Undertakings) Act, 1970 (5 of 1970) or a Regional Rural Bank established under the
                Regional Rural Banks Act, 1976 (21 of 1976) or a corresponding new bank constituted under the Banking
                Companies (Acquisition and Transfer of Undertakings) Act, 1980 (40 of 1980) or a co-operative bank as
                defined in clause (b) of section 2 of the Reserve Bank of India Act, 1934 (2 of 1934) or such other
                banking institution as may be notified by the Central Government for this purpose.
              </p>
            </li>
            <li>
              <p>
                <strong>"Chit"</strong> means a transaction whether called chit, chit fund, chitty, kuri or by any other
                name by or under which a person enters into an agreement with a specified number of persons that every
                one of them shall subscribe a certain sum of money (or a certain quantity of grain instead) by way of
                periodical installments over a definite period and that each such subscriber shall, in his turn, as
                determined by lot or by auction or by tender or in such other manner as may be specified in the chit
                agreement, be entitled to the prize amount.
              </p>
            </li>
            <li>
              <p>
                <strong>"Chit agreement"</strong> means the document containing the articles of agreement between the
                foreman and the subscribers relating to the chit.
              </p>
            </li>
            <li>
              <p>
                <strong>"Foreman"</strong> means the person who under the chit agreement is responsible for the conduct
                of the chit and includes any person discharging the functions of the foreman under section 39.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold">3. Application of the Act</h4>
          <p className="mt-2">The provisions of this Act shall not apply to:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>Any chit started before the commencement of this Act.</li>
            <li>
              Any chit the amount of which, or where two or more chits were started or conducted simultaneously by the
              same foreman, the aggregate amount of which does not exceed one hundred rupees.
            </li>
          </ol>
        </div>
      </div>
    </ActDocumentationLayout>
  )
}
