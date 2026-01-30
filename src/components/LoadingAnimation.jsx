import "../assets/styles/components/loadingAnimation.css"

export default function LoadingAnimation({ visible = false, label = "Loading" }) {
    if (!visible) return null;

    return (
        <div className="loading-animation" role="status" aria-live="polite" aria-label={label}>
            <span className="loading-animation__orbit" aria-hidden="true" />
            <span className="loading-animation__text">{label}</span>
        </div>
    );
}
