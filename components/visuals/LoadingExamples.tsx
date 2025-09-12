/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 *
 * Example usage of the centralized loading system
 * This file demonstrates various ways to implement loading states
 */

"use client";
import React, { Suspense } from "react";
import { CentralizedLoading } from "@/components/visuals";
import { useLoading } from "@/hooks/use-loading";

// Example 1: Using Suspense with CentralizedLoading
const ExampleWithSuspense: React.FC = () => {
  return (
    <Suspense
      fallback={
        <CentralizedLoading
          variant="card"
          title="Loading Component..."
          description="Please wait while we fetch the data"
        />
      }
    >
      {/* Your async component here */}
    </Suspense>
  );
};

// Example 2: Using the useLoading hook for programmatic control
const ExampleWithHook: React.FC = () => {
  const { loadingState, startLoading, stopLoading } = useLoading();

  const handleDataFetch = async () => {
    startLoading("Fetching data...", "list");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error("Error fetching data:", error);
    }
  };

  if (loadingState.isLoading) {
    return (
      <CentralizedLoading
        variant={loadingState.variant || "page"}
        {...(loadingState.message && { title: loadingState.message })}
        count={5}
      />
    );
  }

  const handleButtonClick = () => {
    void handleDataFetch();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Load Data</button>
      {/* Your content here */}
    </div>
  );
};

// Example 3: Full-screen loading overlay
const ExampleWithOverlay: React.FC = () => {
  const [showOverlay, setShowOverlay] = React.useState(false);

  return (
    <>
      <button onClick={() => setShowOverlay(true)}>Show Loading Overlay</button>

      {showOverlay && (
        <CentralizedLoading
          variant="dashboard"
          fullScreen
          title="Processing..."
          description="This may take a few moments"
        />
      )}
    </>
  );
};

// Example 4: Inline loading states for different content types
const ExampleInlineLoading: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile loading */}
      <section>
        <h2>Profile Loading Example</h2>
        <CentralizedLoading variant="profile" title="Loading Profile..." />
      </section>

      {/* Blog loading */}
      <section>
        <h2>Blog Posts Loading Example</h2>
        <CentralizedLoading
          variant="blog"
          title="Loading Articles..."
          count={3}
        />
      </section>

      {/* List loading */}
      <section>
        <h2>List Loading Example</h2>
        <CentralizedLoading variant="list" title="Loading Items..." count={5} />
      </section>

      {/* Dashboard loading */}
      <section>
        <h2>Dashboard Loading Example</h2>
        <CentralizedLoading variant="dashboard" title="Loading Dashboard..." />
      </section>
    </div>
  );
};

export {
  ExampleWithSuspense,
  ExampleWithHook,
  ExampleWithOverlay,
  ExampleInlineLoading,
};
