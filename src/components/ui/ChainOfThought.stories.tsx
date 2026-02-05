import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
  StepStatus,
} from './ChainOfThought';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';

const meta: Meta<typeof ChainOfThought> = {
  title: 'Components/ChainOfThought',
  component: ChainOfThought,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'charcoal', value: '#1a1a2e' },
      ],
    },
    docs: {
      description: {
        component: `
A collapsible chain of thought display inspired by ChatGPT's thinking UI.

Shows AI reasoning steps during processing and auto-collapses when complete.

**Origin:** Ported from [Ask Prism](https://github.com/Jabawack/ask-prism),
a document analytics platform with visual citations.

**Use cases:**
- RAG pipeline visualization
- Multi-step AI processing feedback
- Transparent AI reasoning display
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChainOfThought>;

// Static example showing all step states
export const Default: Story = {
  render: () => (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Processed in 4.2s</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Analyzing query"
            description="Parsed user intent and extracted key entities"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Retrieving relevant chunks"
            description="Found 12 matching passages from 3 documents"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>contract_v2.pdf</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>addendum.pdf</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>terms.pdf</ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            icon={AutoFixHighIcon}
            label="Generating answer"
            description="Synthesized response from retrieved context"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={FactCheckIcon}
            label="Verifying accuracy"
            description="Cross-checked with Claude Haiku 4.5"
            status="complete"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </Box>
  ),
};

// Interactive demo showing processing animation
const ProcessingDemo = () => {
  const [steps, setSteps] = useState<Array<{ id: string; label: string; description: string; status: StepStatus }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const allSteps = [
    { id: '1', label: 'Analyzing query', description: 'Parsing user intent...' },
    { id: '2', label: 'Retrieving chunks', description: 'Searching vector database...' },
    { id: '3', label: 'Generating answer', description: 'Synthesizing response...' },
    { id: '4', label: 'Verifying accuracy', description: 'Cross-checking with Claude...' },
  ];

  const reset = () => {
    setSteps([]);
    setIsComplete(false);
    setIsOpen(true);
  };

  useEffect(() => {
    reset();

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < allSteps.length) {
        setSteps(prev => {
          const updated = prev.map(s => ({ ...s, status: 'complete' as StepStatus }));
          return [...updated, { ...allSteps[currentIndex], status: 'active' as StepStatus }];
        });
        currentIndex++;
      } else {
        setSteps(prev => prev.map(s => ({ ...s, status: 'complete' as StepStatus })));
        setIsComplete(true);
        clearInterval(interval);

        // Auto-collapse after completion
        setTimeout(() => setIsOpen(false), 800);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Watch the processing steps animate, then auto-collapse on completion.
      </Typography>
      <ChainOfThought open={isOpen} onOpenChange={setIsOpen}>
        <ChainOfThoughtHeader>
          {isComplete ? 'Processed in 4.8s' : 'Processing...'}
        </ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          {steps.map((step) => (
            <ChainOfThoughtStep
              key={step.id}
              label={step.label}
              description={step.description}
              status={step.status}
            />
          ))}
        </ChainOfThoughtContent>
      </ChainOfThought>
      {isComplete && (
        <Box
          component="button"
          onClick={reset}
          sx={{
            mt: 2,
            px: 2,
            py: 1,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            border: 'none',
            borderRadius: 1,
            cursor: 'pointer',
            fontSize: '0.875rem',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Replay Animation
        </Box>
      )}
    </Box>
  );
};

export const ProcessingAnimation: Story = {
  render: () => <ProcessingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates real-time step progression with auto-collapse on completion.',
      },
    },
  },
};

// RAG Pipeline example
export const RAGPipeline: Story = {
  render: () => (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Document Q&A Response
      </Typography>
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Thorough mode - 8.3s</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Query routing"
            description="Classified as factual question requiring document retrieval"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Vector search"
            description="Retrieved top 8 chunks (cosine similarity > 0.78)"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>chunk_42 (0.91)</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>chunk_17 (0.88)</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>chunk_89 (0.82)</ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            icon={AutoFixHighIcon}
            label="Primary generation"
            description="GPT-5 Mini synthesized answer from context"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={FactCheckIcon}
            label="Verification"
            description="Claude Haiku 4.5 confirmed factual accuracy"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={EditNoteIcon}
            label="Citation mapping"
            description="Linked 3 claims to source bounding boxes"
            status="complete"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows a complete RAG pipeline with retrieval, generation, and verification steps.',
      },
    },
  },
};

// Step states showcase
export const StepStates: Story = {
  render: () => (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Step Status Variants
      </Typography>
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Status examples</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            label="Complete step"
            description="This step has finished processing"
            status="complete"
          />
          <ChainOfThoughtStep
            label="Active step"
            description="Currently processing with spinner"
            status="active"
          />
          <ChainOfThoughtStep
            label="Pending step"
            description="Waiting to start (dimmed)"
            status="pending"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </Box>
  ),
};

// Collapsed state
export const CollapsedState: Story = {
  render: () => (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Click to expand and see the thinking steps.
      </Typography>
      <ChainOfThought defaultOpen={false}>
        <ChainOfThoughtHeader>Processed in 2.1s</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep label="Analyzed query" status="complete" />
          <ChainOfThoughtStep label="Retrieved context" status="complete" />
          <ChainOfThoughtStep label="Generated response" status="complete" />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </Box>
  ),
};
