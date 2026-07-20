export default function Loading() {
  return <main className="shell page-loading" aria-busy="true" aria-label="Loading page"><div className="loading-heading" /><div className="loading-grid">{Array.from({ length: 8 }).map((_, index) => <div key={index}><span /><i /><b /></div>)}</div></main>;
}
