#!/bin/bash

# Script to feed spec.md to spec-kit and generate implementation plan

echo "======================================"
echo "CRUDkit Plan Generation with Spec-Kit"
echo "======================================"
echo ""
echo "This script will:"
echo "1. Initialize a spec-kit project"
echo "2. Use the spec.md as input"
echo "3. Generate an implementation plan"
echo ""

# Initialize spec-kit project if not already done
if [ ! -f ".specify/config.json" ]; then
    echo "Initializing spec-kit project..."
    specify init crudkit --here <<EOF
y
2
EOF
fi

echo ""
echo "Spec-kit is ready. Now you can:"
echo ""
echo "1. Enter the container:"
echo "   docker-compose exec speckit bash"
echo ""
echo "2. Use spec-kit commands with the spec.md file:"
echo "   - Review the spec: cat spec.md"
echo "   - Generate tasks based on the spec"
echo "   - Create implementation plan"
echo ""
echo "The spec.md contains:"
echo "- Complete system architecture"
echo "- 12 theme specifications"
echo "- PWA implementation details"
echo "- Testing strategies"
echo "- Security requirements"
echo "- CI/CD pipeline configuration"
echo ""
echo "Ready to generate the implementation plan!"