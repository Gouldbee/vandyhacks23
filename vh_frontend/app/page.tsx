import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <img src="Logo.png" alt="Logo" className="w-40 h-40"></img>
      <h4>Profile Creation</h4>
      <center>
      <form action = "inset whatever you want here">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"></input><br></br>
        <label htmlFor="sex">Gender:</label>
        <input type="text" id="sex" name="sex"></input><br></br>
        <label htmlFor="all">Allergies:</label>
        <input type="text" id="all" name="all"></input><br></br>
        <label htmlFor="CMed">Current Medication:</label>
        <input type="text" id="CMed" name="CMed"></input><br></br>
        <label htmlFor="MedCond">Medical Condition:</label>
        <input type="text" id="MedCond" name="MedCond"></input><br></br>
        <input type="submit" value="Submit"></input>
      </form>
      </center>
    </main>
    
  )
}
