export function Help() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Help</h1>
            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">How do I search for a company?</h3>
                    <p>You can use the search bar on the left to search for a company by name.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How do I filter by location or industry?</h3>
                    <p>You can use the dropdown menus on the left to filter the companies by location or industry.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How do I clear the filters?</h3>
                    <p>You can click the "Clear All" button at the bottom of the sidebar to clear all active filters.</p>
                </div>
            </div>
        </div>
    )
}