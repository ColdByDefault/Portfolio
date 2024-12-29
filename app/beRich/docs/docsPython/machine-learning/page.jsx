'use client';
import React, { useState } from 'react';
import { Step, StepItem } from '@/components/Step';
import Link from 'next/link';
import Breadcrumb from '@components/breadcrumb';


const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative mt-4 bg-gray-900 rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300`}>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold py-1 px-2 rounded transition duration-200"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default function MachineLearningIntro() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Machine Learning with Python: Your First Steps</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="1. Install Required Libraries" number="1">
              <p className="mb-4">
                To get started with Machine Learning in Python, install these essential libraries:
              </p>
              <CodeBlock
                code={`pip install numpy pandas matplotlib scikit-learn`}
                language="bash"
              />
              <p className="mt-4">
                These libraries are essential for numerical computing, data manipulation, visualization, and basic ML algorithms.
              </p>
            </StepItem>

            <StepItem title="2. Understand the ML Workflow" number="2">
              <p className="mb-4">The typical machine learning workflow includes the following steps:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Collect data</li>
                <li>Preprocess and clean the data</li>
                <li>Split data into training and testing sets</li>
                <li>Select and train an ML model</li>
                <li>Evaluate the model's performance</li>
                <li>Optimize and deploy the model</li>
              </ul>
              <p>
                For more details, visit{" "}
                <Link href="https://scikit-learn.org/stable/user_guide.html" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                  Scikit-Learn's User Guide
                </Link>.
              </p>
            </StepItem>

            <StepItem title="3. Load and Prepare Data" number="3">
              <p className="mb-4">
                Use pandas to load and preprocess data. Here's an example of loading a CSV dataset:
              </p>
              <CodeBlock
                code={`import pandas as pd

# Load the dataset
data = pd.read_csv("data.csv")

# Display the first few rows
print(data.head())

# Handle missing values
data = data.fillna(data.mean())`}
                language="python"
              />
            </StepItem>

            <StepItem title="4. Split the Data" number="4">
              <p className="mb-4">
                Split your data into training and testing sets using Scikit-Learn's `train_test_split`:
              </p>
              <CodeBlock
                code={`from sklearn.model_selection import train_test_split

# Features and target variable
X = data.drop("target", axis=1)
y = data["target"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`}
                language="python"
              />
            </StepItem>

            <StepItem title="5. Train a Model" number="5">
              <p className="mb-4">
                Train a machine learning model. For example, a decision tree classifier:
              </p>
              <CodeBlock
                code={`from sklearn.tree import DecisionTreeClassifier

# Initialize the model
model = DecisionTreeClassifier()

# Train the model
model.fit(X_train, y_train)`}
                language="python"
              />
            </StepItem>

            <StepItem title="6. Evaluate the Model" number="6">
              <p className="mb-4">
                Evaluate your model's performance using metrics like accuracy:
              </p>
              <CodeBlock
                code={`from sklearn.metrics import accuracy_score

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")`}
                language="python"
              />
            </StepItem>

            <StepItem title="7. Visualize Results" number="7">
              <p className="mb-4">
                Use Matplotlib or Seaborn for data and result visualization. Example:
              </p>
              <CodeBlock
                code={`import matplotlib.pyplot as plt

# Visualize feature importance
importance = model.feature_importances_
plt.bar(range(len(importance)), importance)
plt.xlabel("Features")
plt.ylabel("Importance")
plt.show()`}
                language="python"
              />
            </StepItem>

            <StepItem title="8. Next Steps" number="8">
              <p className="mb-4">
                You're ready to explore advanced ML concepts. Dive into:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  Deep Learning with{" "}
                  <Link href="https://pytorch.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                    PyTorch
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.tensorflow.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                    TensorFlow
                  </Link>
                </li>
                <li>Feature engineering</li>
                <li>Hyperparameter tuning</li>
                <li>Model deployment</li>
                <li>Natural Language Processing (NLP) and Computer Vision</li>
              </ul>
              <p>
                Refer to the{" "}
                <Link href="https://scikit-learn.org/stable/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                  Scikit-Learn Documentation
                </Link>{" "}
                for more advanced topics.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}

