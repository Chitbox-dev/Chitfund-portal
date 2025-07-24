import ActDocumentationLayout from "@/components/legal/act-documentation-layout"

export default function DelhiChitFundRulesPreliminaryPage() {
  return (
    <ActDocumentationLayout
      currentAct="delhi-chit-fund-rules"
      currentChapter="preliminary"
      title="Delhi Chit Fund Rules"
      subtitle="Rules governing chit funds in Delhi"
    >
      <div className="text-center mb-6">
        <p className="text-lg">Delhi Chit Fund Rules</p>
        <p>as notified under the Chit Funds Act</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Chapter I</h2>
      <h3 className="text-lg font-bold uppercase mb-6">PRELIMINARY</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold">1. Short title and commencement</h4>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>These rules may be called the Delhi Chit Fund Rules.</li>
            <li>They shall come into force on such date as the Administrator may, by notification, appoint.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold">2. Definitions</h4>
          <p className="mt-2">In these rules, unless the context otherwise requires:</p>
          <ol className="list-decimal pl-6 space-y-4 mt-2">
            <li>
              <p>
                <strong>"Act"</strong> means the Chit Funds Act, 1982 (40 of 1982);
              </p>
            </li>
            <li>
              <p>
                <strong>"Form"</strong> means a form appended to these rules;
              </p>
            </li>
            <li>
              <p>
                <strong>"Section"</strong> means a section of the Act;
              </p>
            </li>
            <li>
              <p>
                <strong>"Year"</strong> means the financial year commencing on the first day of April;
              </p>
            </li>
            <li>
              <p>
                Words and expressions used but not defined in these rules shall have the meanings respectively assigned
                to them in the Act.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold">3. Matters to be prescribed</h4>
          <p className="mt-2">The following matters shall be prescribed by the Administrator:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>The form of declaration and the fee for filing the same under sub-section (2) of section 5;</li>
            <li>
              The additional particulars to be included in the chit agreement under clause (q) of sub-section (1) of
              section 6;
            </li>
            <li>The manner of investment of the chit amount under section 20;</li>
            <li>
              The form and the manner in which books of accounts shall be maintained by the foreman under section 23;
            </li>
            <li>The fee for inspection of documents under section 62;</li>
          </ol>
        </div>
      </div>
    </ActDocumentationLayout>
  )
}
