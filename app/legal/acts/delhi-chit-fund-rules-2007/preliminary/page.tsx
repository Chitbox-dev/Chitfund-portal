import ActDocumentationLayout from "@/components/legal/act-documentation-layout"

export default function DelhiChitFundRules2007PreliminaryPage() {
  return (
    <ActDocumentationLayout
      currentAct="delhi-chit-fund-rules-2007"
      currentChapter="preliminary"
      title="Delhi Chit Fund Rules, 2007"
      subtitle="Updated rules for chit funds in Delhi"
    >
      <div className="text-center mb-6">
        <p className="text-lg">Delhi Chit Fund Rules, 2007</p>
        <p>as notified under the Chit Funds Act, 1982</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Chapter I</h2>
      <h3 className="text-lg font-bold uppercase mb-6">PRELIMINARY</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold">1. Short title and commencement</h4>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>These rules may be called the Delhi Chit Fund Rules, 2007.</li>
            <li>They shall come into force on the date of their publication in the Official Gazette.</li>
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
                <strong>"Government"</strong> means the Government of National Capital Territory of Delhi;
              </p>
            </li>
            <li>
              <p>
                <strong>"Registrar"</strong> means the Registrar of Chits appointed under section 61 of the Act;
              </p>
            </li>
            <li>
              <p>
                <strong>"Section"</strong> means a section of the Act;
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
          <h4 className="font-bold">3. Application for registration</h4>
          <p className="mt-2">
            Every application for registration of a chit under section 4 shall be in Form I and shall be accompanied by:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>A copy of the proposed chit agreement;</li>
            <li>A declaration in Form II;</li>
            <li>A certificate from an approved bank as required under section 8;</li>
            <li>The chit agreement stamps as required under the Delhi Stamp Act;</li>
            <li>The registration fee as specified in rule 42.</li>
          </ol>
        </div>
      </div>
    </ActDocumentationLayout>
  )
}
