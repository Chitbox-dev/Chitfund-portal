import ActDocumentationLayout from "@/components/legal/act-documentation-layout"

export default function MadrasChitFundsActPreliminaryPage() {
  return (
    <ActDocumentationLayout
      currentAct="madras-chitfunds-act"
      currentChapter="preliminary"
      title="The Madras Chit Funds Act, 1961"
      subtitle="as Extended to the Union Territory of Delhi"
      year="(Madras Act 24 of 1961)"
    >
      <div className="text-center mb-6">
        <p className="text-lg">An Act to provide for othe regulation of chit funds</p>
        <p>in the State of Madras</p>
      </div>

      <div className="mb-6">
        <p>Whereas it is expedient to provide for the regulation of chit funds in the State of Madras:</p>
        <p>Be it enacted in the Twelfth Year of the Republic of India as follows:-</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Chapter 1</h2>
      <h3 className="text-lg font-bold uppercase mb-6">PRELIMINARY</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold">1. Short title, extent, and commencement -</h4>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>This Act be called the Madras Chit Funds Act, 1961.</li>
            <li>It extends to the whole of the Union Territory of Delhi.</li>
            <li>
              It shall come into force on such date as the administrator may by notification, appoint and different
              dates may be appointed for different areas and for different provisions of this Act.
            </li>
          </ol>
        </div>

        <div>
          <h4 className="font-bold">2. Definitions - In this Act, unless the context otherwise requires, -</h4>
          <ol className="list-decimal pl-6 space-y-4 mt-2">
            <li>
              <p>
                <strong>"Administrator"</strong> means the administrator for the Union Territory of Delhi.
              </p>
            </li>
            <li>
              <p>
                <strong>"Approved bank"</strong> means a bank approved by the Administrator.
              </p>
            </li>
            <li>
              <p>
                <strong>"Chit"</strong> means a transaction whether called chit fund, chit, kuri or by any other name,
                by which its foreman enters into an agreement with a numbers of subscribers that every one of them shall
                subscribe a certain quantity of grain by instalments for a definite period and that each subscriber in
                his turn as may be provided for in the agreement, shall be entitled to a prize amount.
              </p>

              <div className="bg-gray-100 p-4 rounded-md mt-2">
                <p className="font-medium">
                  Explanation - A transaction is not a chit within the meaning of this clause, if in such transaction -
                </p>
                <ol className="list-[lower-alpha] pl-6 mt-2">
                  <li>
                    Some alone but not all, of the subscribers get the prize amount without any liability to pay future
                    subscriptions; or
                  </li>
                  <li>
                    All the subscribers get whole of the chit amount by turns with a liability to pay future
                    subscriptions.
                  </li>
                </ol>
              </div>

              <div className="bg-gray-100 p-4 rounded-md mt-2">
                <p className="font-medium">
                  Illustration - There are 100 subscribers to a chit and the subscription by each of them is Rs.10. All
                  the subscribers get by turns Rs.1,000 being the whole of the chit amount and are liable to pay future
                  subscriptions. The transaction falls within clause (b) of the above Explanation and is not a chit.
                </p>
              </div>
            </li>
            <li>
              <p>
                <strong>"Chit agreement"</strong> means a document containing the articals of agreement between the
                foreman and the subscribers relating to the chit;
              </p>
            </li>
            <li>
              <p>
                <strong>"Chit amount"</strong> means the sum total of the subscriptions payable by all the subscribers
                for any instalment of a chit without any deduction for discount or otherwise;
              </p>
            </li>
            <li>
              <p>
                <strong>"Defaulting subscriber"</strong> means a subscriber who has defaulted in the payment of
                subscriptions due according to the terms of the chit agreement;
              </p>
            </li>
          </ol>
        </div>
      </div>
    </ActDocumentationLayout>
  )
}
