export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex gap-2">
        <span className="h-4 w-4 animate-bounce rounded-full bg-[#622ad8]" />
        <span
          className="h-4 w-4 animate-bounce rounded-full bg-[#8140c8]"
          style={{ animationDelay: "0.1s" }}
        />
        <span
          className="h-4 w-4 animate-bounce rounded-full bg-[#a8258e]"
          style={{ animationDelay: "0.2s" }}
        />
      </div>

      <h2 className="mt-6 bg-gradient-to-r from-[#622ad8] to-[#a8258e] bg-clip-text text-2xl font-bold text-transparent">
        Loading WisdomVault...
      </h2>
    </div>
  );
}