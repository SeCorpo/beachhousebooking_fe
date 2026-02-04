import ReservationDoneLetter from "../components/ReservationDoneLetter.jsx";

export default function ReservationDoneView ({
    createdReservationResponseModel,
}) {
    return (
        <>
            <main className="app-main">
                <ReservationDoneLetter createdReservationResponseModel={createdReservationResponseModel} />
            </main>
        </>
    )
}