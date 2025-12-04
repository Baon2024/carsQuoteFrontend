





export default function DummyFolderHome() {



   //i want to try out the feeling of dynamic UI, and try and get an LLM to choose for me
   const BasicComponent = (inheritedWord) => (
    <>
      <p>Basic Component - {`${inheritedWord}`}</p>
    </>
   )

   const MoreAdvancedComponent = (inheritedWord) -> (
    <>
      <h1>More Advanced Component</h1>
      <p></p>
    </>
   )


   uiComponentsArray = [BasicComponent]






    return <><p>placeholder</p></>
}