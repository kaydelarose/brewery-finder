// import { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import brewerService from "../../../services/brewer-service/BrewerService";
// import { Brewer } from "../../../models/brewer/Brewer";
// import { BrewerContext } from "../../../contexts/brewer-context/BrewerContext";

// export default function BrewerProfile() {
//     const { brewerId } = useParams();

//     const context = useContext(BrewerContext);
//     //delete when verified
//     console.log(brewerId);

//     const [brewerData, setBrewerData] = useState<Brewer | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchBrewerData = async () => {
//             try {
//                 const response = await brewerService.getBrewerById(brewerId)
//                 setBrewerData(response)

//             } catch (error) {
//                 setError('Error fetching brewer data');
//             } finally {
//                 setLoading(false)
//             };
//         }
//         fetchBrewerData();
//     }, [brewerId]);
    
//     //delete when verified
//     console.log(brewerData);

//     if (loading) return <p> Loading Brewer...</p>
//     if (error) return <p> Error: {error}</p>

//     return (
//         <>

//             <div className="container">
//             <Link className="btn btn-outline-warning mb-3" to="/brewers">Back</Link>
//             <h4>Your Profile </h4>
//                 <div className="card">
//                     <p> Brewer Id: {brewerId}</p>
//                     <p>Breweries Owned: {brewerData?.breweriesOwned}</p>
//                     <p> User Id: {brewerData?.userId}</p>
//                 </div>

//             </div>



//         </>
//     )
// }