"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GitBranch, GitCommit, GitMerge, Github, GitPullRequest, RefreshCcw } from "lucide-react"
import CodeBlock from "@/components/ui/code-block"
import { useTheme } from "next-themes"

export default function GitHubLearningPage() {
    const { theme } = useTheme()


  return (
    <div className={`flex flex-col justify-center pt-24
        items-center flex-grow p-4 ${theme === "dark" ? "dark" : "light"}`}>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Git & GitHub Fundamentals</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive guide to understanding version control with Git and collaboration with GitHub
        </p>
      </header>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="flex flex-wrap w-full mb-6 lg:mb-0 ">
          <TabsTrigger value="basics" className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Basics</TabsTrigger>
          <TabsTrigger value="workflow" className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Workflow</TabsTrigger>
          <TabsTrigger value="branching" className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Branching</TabsTrigger>
          <TabsTrigger value="github" className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">GitHub</TabsTrigger>
          <TabsTrigger value="advanced" className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-6 w-6" />
                What is Git?
              </CardTitle>
              <CardDescription>Understanding the fundamentals of version control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Git is a distributed version control system that tracks changes in any set of computer files. It was
                created by Linus Torvalds in 2005 for the development of the Linux kernel.
              </p>

              <h3 className="text-lg font-medium mt-4">Key Concepts:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Repository (Repo)</strong>: A storage location for your project, containing all files and the
                  history of changes made to those files.
                </li>
                <li>
                  <strong>Commit</strong>: A snapshot of your repository at a specific point in time.
                </li>
                <li>
                  <strong>Branch</strong>: A parallel version of the repository that allows you to work on different
                  features without affecting the main codebase.
                </li>
                <li>
                  <strong>Merge</strong>: The process of combining changes from different branches.
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-4">Setting Up Git</h3>
              <p>First, you need to install Git on your computer and configure your identity:</p>

              <CodeBlock
                code={`# Install Git (on Ubuntu/Debian)
sudo apt-get install git

# Install Git (on macOS with Homebrew)
brew install git

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your configuration
git config --list`}
                language="bash"
              />
            </CardContent>
          </Card>

          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle>Basic Git Commands</CardTitle>
              <CardDescription>Essential commands to get started with Git</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="init">
                  <AccordionTrigger>Creating a Repository</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To create a new Git repository:</p>
                    <CodeBlock
                      code={`# Create a new directory
mkdir my-project
cd my-project

# Initialize a new Git repository
git init`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="status">
                  <AccordionTrigger>Checking Status</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To see the status of your working directory:</p>
                    <CodeBlock code={`git status`} language="bash" showLineNumbers={false} />
                    <p className="mt-2">This shows which files are tracked, modified, or staged.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="add">
                  <AccordionTrigger>Adding Files</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To start tracking new files or stage modified files:</p>
                    <CodeBlock
                      code={`# Add a specific file
git add filename.txt

# Add all files in the current directory
git add .

# Add all files of a specific type
git add *.js`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="commit">
                  <AccordionTrigger>Committing Changes</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To save your changes to the repository:</p>
                    <CodeBlock
                      code={`# Commit with a message
git commit -m "Add new feature"

# Commit all tracked files with a message
git commit -am "Fix bugs in login system"`}
                      language="bash"
                    />
                    <p className="mt-2">
                      Write meaningful commit messages that explain what changes were made and why.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="log">
                  <AccordionTrigger>Viewing History</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To see the commit history:</p>
                    <CodeBlock
                      code={`# View commit history
git log

# View a compact log
git log --oneline

# View graphical representation
git log --graph --oneline --all`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw className="h-6 w-6" />
                Git Workflow
              </CardTitle>
              <CardDescription>Understanding the basic Git workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The basic Git workflow involves modifying files in your working directory, staging the changes you want
                to include in your next commit, and then committing those changes to your repository.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium mb-2">Working Directory</h3>
                  <p className="text-sm text-muted-foreground">Where you modify your files</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium mb-2">Staging Area</h3>
                  <p className="text-sm text-muted-foreground">Where you prepare changes for commit</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium mb-2">Repository</h3>
                  <p className="text-sm text-muted-foreground">Where commits are stored</p>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-4">Typical Workflow Example:</h3>

              <CodeBlock
                code={`# Create a file
echo "Hello, Git!" > hello.txt

# Check status - will show untracked file
git status

# Add the file to staging area
git add hello.txt

# Check status again - file is now staged
git status

# Commit the change
git commit -m "Add hello.txt file"

# Modify the file
echo "Learning Git is fun!" >> hello.txt

# Check status - will show modified file
git status

# Stage and commit the change
git add hello.txt
git commit -m "Update hello.txt with new line"`}
                language="bash"
              />
            </CardContent>
          </Card>

          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle>Undoing Changes</CardTitle>
              <CardDescription>How to revert changes in different stages</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="unstage">
                  <AccordionTrigger>Unstaging Files</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To remove files from the staging area:</p>
                    <CodeBlock
                      code={`# Unstage a specific file
git restore --staged filename.txt

# Older syntax (still works)
git reset HEAD filename.txt`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="discard">
                  <AccordionTrigger>Discarding Changes</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To discard changes in your working directory:</p>
                    <CodeBlock
                      code={`# Discard changes to a specific file
git restore filename.txt

# Older syntax (still works)
git checkout -- filename.txt

# WARNING: This will discard all changes in your working directory
git restore .`}
                      language="bash"
                    />
                    <p className="mt-2 text-red-500">
                      Be careful with these commands as they permanently discard changes!
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="amend">
                  <AccordionTrigger>Amending Commits</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To modify your last commit:</p>
                    <CodeBlock
                      code={`# Add forgotten files
git add forgotten-file.txt

# Amend the previous commit
git commit --amend -m "New commit message"

# Amend without changing the commit message
git commit --amend --no-edit`}
                      language="bash"
                    />
                    <p className="mt-2">Only amend commits that haven't been pushed to a shared repository.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branching" className="space-y-6">
          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-6 w-6" />
                Branching and Merging
              </CardTitle>
              <CardDescription>Working with branches to manage parallel development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Branches allow you to develop features, fix bugs, or experiment with new ideas in isolation from the
                main codebase. This is one of Git's most powerful features.
              </p>

              <h3 className="text-lg font-medium mt-4">Working with Branches:</h3>

              <CodeBlock
                code={`# List all branches (* indicates current branch)
git branch

# Create a new branch
git branch feature-login

# Switch to a branch
git checkout feature-login

# Create and switch to a new branch (shorthand)
git checkout -b feature-signup

# Rename a branch
git branch -m old-name new-name

# Delete a branch (after merging)
git branch -d branch-name

# Force delete a branch (even if not merged)
git branch -D branch-name`}
                language="bash"
              />

              <div className="flex items-center justify-center my-6">
                <div className="border rounded-lg p-6 max-w-md">
                  <h4 className="font-medium mb-2 text-center">Branching Best Practices</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Use descriptive branch names (e.g., <code>feature/user-authentication</code>)
                    </li>
                    <li>Keep branches focused on a single task or feature</li>
                    <li>Regularly sync your branch with the main branch</li>
                    <li>Delete branches after they're merged</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-4">Merging Branches:</h3>

              <CodeBlock
                code={`# Switch to the target branch (e.g., main)
git checkout main

# Merge a branch into the current branch
git merge feature-login

# Merge with a commit message
git merge feature-signup --m "Merge signup feature"`}
                language="bash"
              />
            </CardContent>
          </Card>

          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitMerge className="h-6 w-6" />
                Handling Merge Conflicts
              </CardTitle>
              <CardDescription>Resolving conflicts that occur during merging</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Merge conflicts occur when Git can't automatically merge changes because the same part of a file was
                modified differently in both branches.
              </p>

              <h3 className="text-lg font-medium mb-2">When a conflict occurs:</h3>

              <CodeBlock
                code={`# Git will show which files have conflicts
git status

# The conflicted file will contain markers
<<<<<< HEAD
This is the change in the current branch
=======
This is the change in the branch being merged
>>>>>>> feature-branch`}
                language="bash"
              />

              <h3 className="text-lg font-medium mt-4 mb-2">Resolving conflicts:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open the conflicted files in your editor</li>
                <li>
                  Look for the conflict markers (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>,{" "}
                  <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>)
                </li>
                <li>Edit the file to resolve the conflict (remove the markers and keep the desired code)</li>
                <li>Save the file</li>
                <li>Stage the resolved file and complete the merge</li>
              </ol>

              <CodeBlock
                code={`# After resolving conflicts in the files
git add resolved-file.txt

# Complete the merge
git commit -m "Resolve merge conflicts"

# If you want to abort the merge
git merge --abort`}
                language="bash"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-6 w-6" />
                GitHub Basics
              </CardTitle>
              <CardDescription>Understanding GitHub and remote repositories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GitHub is a web-based hosting service for Git repositories. It provides collaboration features such as
                bug tracking, feature requests, task management, and wikis for every project.
              </p>

              <h3 className="text-lg font-medium mt-4">Setting Up GitHub:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Create a GitHub account at{" "}
                  <a href="https://github.com" className="text-blue-600 hover:underline">
                    github.com
                  </a>
                </li>
                <li>Set up SSH keys for secure authentication (recommended)</li>
                <li>Create a new repository or fork an existing one</li>
              </ol>

              <h3 className="text-lg font-medium mt-4">Working with Remote Repositories:</h3>

              <CodeBlock
                code={`# Clone a repository (download a copy)
git clone https://github.com/username/repository.git

# Add a remote repository
git remote add origin https://github.com/username/repository.git

# View remote repositories
git remote -v

# Fetch changes from a remote repository
git fetch origin

# Pull changes from a remote repository (fetch + merge)
git pull origin main

# Push changes to a remote repository
git push origin main

# Push a new branch to a remote repository
git push -u origin feature-branch`}
                language="bash"
              />
            </CardContent>
          </Card>

          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitPullRequest className="h-6 w-6" />
                Collaboration on GitHub
              </CardTitle>
              <CardDescription>Pull requests, issues, and collaboration workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Fork and Pull Request Workflow:</h3>
              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Fork a repository to your GitHub account</li>
                <li>Clone your fork to your local machine</li>
                <li>Create a branch for your changes</li>
                <li>Make and commit your changes</li>
                <li>Push your branch to your fork</li>
                <li>Create a pull request from your branch to the original repository</li>
              </ol>

              <CodeBlock
                code={`# Clone your fork
git clone https://github.com/your-username/repository.git

# Add the original repository as a remote (often called "upstream")
git remote add upstream https://github.com/original-owner/repository.git

# Create a branch for your feature
git checkout -b feature-name

# Make changes, commit them
git add .
git commit -m "Add new feature"

# Push to your fork
git push origin feature-name

# Now go to GitHub and create a pull request`}
                language="bash"
              />

              <h3 className="text-lg font-medium mt-6 mb-2">Keeping Your Fork Updated:</h3>

              <CodeBlock
                code={`# Fetch changes from the original repository
git fetch upstream

# Merge changes from the original repository's main branch
git checkout main
git merge upstream/main

# Push the updated main branch to your fork
git push origin main`}
                language="bash"
              />

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">GitHub Features for Collaboration:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Issues</strong>: Track bugs, enhancements, and other requests
                  </li>
                  <li>
                    <strong>Pull Requests</strong>: Propose changes and review code
                  </li>
                  <li>
                    <strong>Discussions</strong>: Have conversations about the project
                  </li>
                  <li>
                    <strong>Projects</strong>: Manage work with boards, similar to Kanban
                  </li>
                  <li>
                    <strong>Actions</strong>: Automate workflows like testing and deployment
                  </li>
                  <li>
                    <strong>Wiki</strong>: Document your project
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle>Advanced Git Techniques</CardTitle>
              <CardDescription>More powerful Git features for experienced users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rebase">
                  <AccordionTrigger>Rebasing</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Rebasing is an alternative to merging that rewrites commit history:</p>
                    <CodeBlock
                      code={`# Rebase current branch onto main
git checkout feature-branch
git rebase main

# Interactive rebase for the last 3 commits
git rebase -i HEAD~3`}
                      language="bash"
                    />
                    <p className="mt-2 text-amber-600">
                      Warning: Never rebase commits that have been pushed to a public repository!
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stash">
                  <AccordionTrigger>Stashing Changes</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Temporarily store changes to work on something else:</p>
                    <CodeBlock
                      code={`# Stash current changes
git stash

# List stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply a specific stash
git stash apply stash@{2}

# Remove a stash after applying
git stash drop stash@{0}

# Apply and remove the most recent stash
git stash pop`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cherry-pick">
                  <AccordionTrigger>Cherry-picking</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Apply specific commits from one branch to another:</p>
                    <CodeBlock
                      code={`# Apply a single commit to current branch
git cherry-pick commit-hash

# Apply multiple commits
git cherry-pick commit-hash-1 commit-hash-2

# Cherry-pick a range of commits
git cherry-pick commit-hash-1^..commit-hash-2`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bisect">
                  <AccordionTrigger>Git Bisect</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Binary search to find which commit introduced a bug:</p>
                    <CodeBlock
                      code={`# Start bisect
git bisect start

# Mark current version as bad
git bisect bad

# Mark a known good commit
git bisect good commit-hash

# Git will checkout commits for you to test
# After testing, mark as good or bad
git bisect good  # or git bisect bad

# When finished, reset to original state
git bisect reset`}
                      language="bash"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hooks">
                  <AccordionTrigger>Git Hooks</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Scripts that run automatically on certain Git events:</p>
                    <CodeBlock
                      code={`# Common hooks (located in .git/hooks/):
pre-commit       # Run before a commit is created
prepare-commit-msg # Modify default commit message
commit-msg       # Validate commit messages
post-commit      # Run after a commit is created
pre-push         # Run before pushing to a remote
post-merge       # Run after a merge is completed

# Example pre-commit hook to run tests
#!/bin/sh
npm test

# If tests fail, prevent the commit
if [ $? -ne 0 ]; then
  echo "Tests failed, aborting commit"
  exit 1
fi`}
                      language="bash"
                    />
                    <p className="mt-2">
                      Make hook scripts executable with <code>chmod +x .git/hooks/pre-commit</code>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <CardTitle>Git Best Practices</CardTitle>
              <CardDescription>Tips for effective Git usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Commit Messages</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Write clear, concise commit messages</li>
                    <li>Use the imperative mood ("Add feature" not "Added feature")</li>
                    <li>Keep the first line under 50 characters</li>
                    <li>Add details in the body if needed, separated by a blank line</li>
                    <li>Reference issue numbers when applicable</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Repository Organization</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Use a .gitignore file for build artifacts, dependencies, etc.</li>
                    <li>Include a README.md with project information</li>
                    <li>Document your branching strategy</li>
                    <li>Consider using Git LFS for large files</li>
                    <li>Keep repositories focused on a single project</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Workflow Tips</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Commit early and often</li>
                    <li>Pull before pushing to avoid conflicts</li>
                    <li>Use branches for features and bug fixes</li>
                    <li>Regularly clean up old branches</li>
                    <li>Consider using Git aliases for common commands</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Collaboration</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Review code before merging</li>
                    <li>Use descriptive pull request titles and descriptions</li>
                    <li>Squash commits before merging when appropriate</li>
                    <li>Communicate with your team about branch status</li>
                    <li>Document your Git workflow for new team members</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

